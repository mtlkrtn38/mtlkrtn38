var app = angular.module("App", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("/", {
            url: '/',
            templateUrl: "components/home.html"
        })
        .state("series", {
            url: '/series',
            templateUrl: "components/series.html"
        })
        .state("movies", {
            url: '/movies',
            templateUrl: "components/movies.html"
        })
})

app.factory("postFactory", function ($http) {
    var url = "https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json";
    var res = {
        getData: getData
    };

    function getData() {
        return $http({
            'url': url,
            'method': 'GET'
        });
    }
    return res;
});

app.run(function ($rootScope, $state) {
    $rootScope.$state = $state; // for active path status control
});


app.controller("mainController", function ($scope) {
    //global content controller
});

app.controller("moviesController", function ($scope, postFactory) {
    $scope.loading = true;
    $scope.err = false;
    postFactory.getData().then(function (res) {
        $scope.loading = false;
        $scope.list = res.data.entries.filter((item) => item.releaseYear >= 2010 && item.programType =='movie');
        // console.log(res.data.entries)
        // console.log(res.data.entries.filter((item) => item.releaseYear >= 2010 && item.programType =='movie'))
    }, function (err) {
        $scope.err = true;
        // console.log(err)
    });
});

app.controller("seriesController", function ($scope, postFactory) {
    $scope.loading = true;
    $scope.err = false;
    postFactory.getData().then(function (res) {
        $scope.loading = false;
        $scope.list = res.data.entries.filter((item) => item.releaseYear >= 2010 && item.programType =='series');
        // console.log(res.data.entries)
        // console.log(res.data.entries.filter((item) => item.releaseYear >= 2010 && item.programType =='series'))
    }, function (err) {
        $scope.err = true;
        // console.log(err)
    });
});



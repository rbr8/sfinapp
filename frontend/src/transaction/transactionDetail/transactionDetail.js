angular
    .module('sfinapp.transaction.transactionDetail', [
        'ui.router',
        'toastr',

        'sfinapp.core',
        'sfinapp.account.accountSrv',
        'sfinapp.tag.tagSrv',
        'sfinapp.transaction.transactionSrv'
    ])
    .config(transactionDetailConfig)
    .controller('transactionDetailCtrl', transactionDetailCtrl);


function transactionDetailConfig($stateProvider) {
    $stateProvider.state('app.transaction.detail', {
        url: '/:id',
        controller: 'transactionDetailCtrl',
        controllerAs: 'vm',
        templateUrl: 'src/transaction/transactionDetail/transactionDetail.tpl.html',
        resolve: {
            accounts: (accountSrv) => { return accountSrv.getAll(); },
            descriptions: (transactionSrv) => { return transactionSrv.getAllDescriptions(); },
            tags: (tagSrv) => { return tagSrv.getAll();},
            transactionId: ($stateParams) => { return $stateParams.id; },
            isNew: (transactionId) => { return transactionId === 'new'; },
            transaction: (transactionId, isNew, transactionSrv) => {
                return isNew ? transactionSrv.skeleton() : transactionSrv.get(transactionId);
            }
        }
    });
}

function transactionDetailCtrl($log,
                               toastr,
                               confirmSrv,
                               locationSrv,
                               transactionSrv,
                               accounts,
                               descriptions,
                               isNew,
                               tags,
                               transaction) {
    var vm = this;

    vm.accounts = accounts;
    vm.tags = tags;
    vm.isNew = isNew;
    vm.transaction = transaction;

    vm.save = save;
    vm.remove = remove;
    vm.suggestDescription = (term) => { return transactionSrv.suggestDescription(descriptions, term); };

    ////////////

    function save() {
        var method = isNew ? transactionSrv.create : transactionSrv.update;
        method(vm.transaction).then(saveSuccess, toastr.apiError);
    }

    function saveSuccess() {
        toastr.success('Transaction is saved.');
        locationSrv.goToUrl('transactions');
    }

    function remove() {
        confirmSrv.confirm('Are you sure you want to delete this transaction?', callDelete);
    }

    function callDelete() {
        transactionSrv.delete(vm.transaction).then(deleteSuccess, toastr.apiError);
    }

    function deleteSuccess() {
        toastr.success('Transaction is deleted.');
        locationSrv.goToUrl('transactions');
    }
}

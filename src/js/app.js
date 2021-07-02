

console.log("app.js loaded");


if(typeof window.ethereum!=="undefined")
{
	console.log("The metamask is installed");
}

App={
	contracts:{},
	web3Provider:null,
	account:'0x0',
	tokenPrice:1000000000000000,
	tokensSold:0,
	tokensAvailable:1000000,
	init:function()
	{
		return App.web3Init();
	},

web3Init: function()
{
if(typeof web3!=='undefined')
{
	App.web3Provider=web3.currentProvider;
	web3 =  new Web3(web3.currentProvider);
}
else{

	App.web3Provider=new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
	web3=new Web3(App.web3Provider);
}


return App.contractInit();

},

contractInit:function()
{
	$.getJSON("SaxToken.json",function(saxToken)
	{
		App.contracts.SaxToken=TruffleContract(saxToken);
		App.contracts.SaxToken.setProvider(App.web3Provider);
		App.contracts.SaxToken.deployed().then(function(saxToken)
			{
				console.log("SaxToken address is: "+saxToken.address);
			});
		
	}).done(function()
	{

	$.getJSON("SaxTokenSale.json",function(saxTokenSale)
	{
		App.contracts.SaxTokenSale=TruffleContract(saxTokenSale);
		App.contracts.SaxTokenSale.setProvider(App.web3Provider);
		App.contracts.SaxTokenSale.deployed().then(function(saxTokenSale)
			{
				console.log("SaxTokenSale address is: "+saxTokenSale.address);
			});

    App.listenForEvents();
		return App.render();
	})
  });
	
},

 listenForEvents: function() {
    App.contracts.SaxTokenSale.deployed().then(function(instance) {
      instance.Sell({}, {
        fromBlock: 0,
        toBlock: 'latest',
      }).watch(function(error, event) {
        console.log("event triggered", event);
        App.render();
      })
    })
  },

render: function()
{
	$('#loader').show();
	$('#content').hide();

	web3.eth.getCoinbase(function(err,account)
		{
			if(err==null)
			{
				$('#accountAddress').html("Your account "+ account);
				App.account=account;
				console.log(account);
			}
		});

    App.contracts.SaxTokenSale.deployed().then(function(contract)
    {
      saxTokenSaleInstance=contract;
      return saxTokenSaleInstance.tokenPrice();
    }).then(function(price)
    {
      App.tokenPrice=price;
      console.log(price.toNumber());
       $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
       return saxTokenSaleInstance.tokensSold();
    }).then(function(tokensSold)
    {
      App.tokensSold=tokensSold.toNumber();
      $(".tokens-sold").html(App.tokensSold);
      $(".tokens-available").html(App.tokensAvailable);

      var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
      $('#progress').css('width', progressPercent + '%');

      return App.contracts.SaxToken.deployed();

    }).then(function(SaxTokenContract)
    {
    	tokenContract=SaxTokenContract;
    	return tokenContract.balanceOf(App.account);
    }).then(function(balance)
    {
  
       $(".sax-balance").html(balance.toNumber());
    })

     $('#loader').hide();
	    $('#content').show();

},

/*buyTokens: function()
{
	$('#loader').show();
	$('#content').hide();

	var numberOfTokens=$("#numberOfTokens").val();

	App.contracts.SaxTokenSale.deployed().then(function(tokenSaleContract){

		return tokenSaleContract.buyTokens(numberOfTokens,{
			from:App.account,
			value:tokenPrice*numberOfTokens,
			gas:500000
		})

	}).then(function(result){
      	console.log("Tokens were bought");
      	 $('form').trigger('reset');
      });



    $('#loader').hide();
	$('#content').show();
}*/


buyTokens: function() {
    $('#content').hide();
    $('#loader').show();
    var numberOfTokens = $('#numberOfTokens').val();
    console.log(numberOfTokens);
    App.contracts.SaxTokenSale.deployed().then(function(instance) {
      return instance.buyTokens(numberOfTokens, {
        from: App.account,
        value: numberOfTokens * App.tokenPrice,
        gas: 500000 // Gas limit
      });
    }).then(function(result) {
      console.log("Tokens bought...")
      $('form').trigger('reset') // reset number of tokens in form
      // Wait for Sell event
    });
  }

}

$(function()
{
	$(window).load(function()
	{
		App.init();
	})
});

/* App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
  tokenPrice: 1000000000000000,
  tokensSold: 0,
  tokensAvailable: 750000,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON("SaxTokenSale.json", function(saxTokenSale) {
      App.contracts.SaxTokenSale = TruffleContract(saxTokenSale);
      App.contracts.SaxTokenSale.setProvider(App.web3Provider);
      App.contracts.SaxTokenSale.deployed().then(function(saxTokenSale) {
        console.log("Dapp Token Sale Address:", saxTokenSale.address);
      });
    }).done(function() {
      $.getJSON("SaxToken.json", function(saxToken) {
        App.contracts.SaxToken = TruffleContract(saxToken);
        App.contracts.SaxToken.setProvider(App.web3Provider);
        App.contracts.SaxToken.deployed().then(function(saxToken) {
          console.log("Dapp Token Address:", saxToken.address);
        });

      });
    })
  },

}

        $(function() {
  $(window).load(function() {
    App.init();
  })
});*/





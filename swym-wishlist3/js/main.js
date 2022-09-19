(function($){

    "use strict";

	document.body.classList.add("swym-buttons-loaded");
	function insertSwymScript() {
		var swymSrcElem = document.createElement('script');
        swymSrcElem.setAttribute('src','https://swymdevv3.azureedge.net/code/swym.js');
		
        document.head.appendChild(swymSrcElem);
	}
	insertSwymScript();
	
	var swymJSObject = {
      pid: "SVNhlXQ7rIr4TxZh6u3N6VttpIg+IDDLkIzYT0xz1gg="
    };
    window.swymJSWCLoad = function(){
    if(!window._swat) {
     console.log("swymJSWCLoad", "if");
     (function (s, w, r, e, l, a, y) {
       r['SwymRetailerConfig'] = s;
       r[s] = r[s] || function (k, v) {
         r[s][k] = v;
       };
     })('_swrc', '', window);
     _swrc('RetailerId', swymJSObject.pid);
     _swrc('Callback', function(){initSwymWC();});
   }else if(window._swat.postLoader){
     console.log("swymJSWCLoad", "else if", swymJSObject);
     _swrc = window._swat.postLoader;
     _swrc('RetailerId', swymJSObject.pid);
     _swrc('Callback', function(){initSwymWC();});
   }else{
     console.log("swymJSWCLoad", "else");
     initSwymWC();
   }
 }
  window.initSwymWC = function() {
   var swat = window._swat;
   var swymPageData = {"et": 0};
   var regid = swat.getSwymRegistrationId();
   if(!regid) {
     swat.refresh(initUI(), function() { console.log("Swym - Failed to create regid"); });
     return;
   } else {
      initUI();
   }
  }
  
  var currentVariantId;
   function initUI() {
  	// Your UI code goes here
  	console.log("Inside UI") ;
	   window._swat.platform = {
		   type: "woocommerce",
		   redirectToLoginPage: function() {
			   window.location = "/my-account";
		   }
	   }
	   window._swat.fetch(function(res) {
		   var wishlistBtns = document.querySelectorAll(".swym-add-to-wishlist-view-product");
		   wishlistBtns.forEach(wb => {
			  var productId = wb.getAttribute("data-product");
		      var isWishlisted = res.filter(r => r.empi === +productId && (currentVariantId ? r.epi === currentVariantId : true));
     		  if (isWishlisted.length) {
	    		  wb.classList.add("swym-added");
		      }	 
		   });
	   })
   }
  window.swymJSWCLoad();	
	
	$( document ).on( "found_variation.first", function ( e, v ) {
    	currentVariantId = v.variation_id;
		var wishlistBtn = document.querySelector(".swym-add-to-wishlist-view-product");
		var productId = wishlistBtn.getAttribute("data-product");
		window._swat.fetch(function(res) {
			var isWishlisted = res.filter(r => r.empi === +productId && r.epi === currentVariantId);
            if (isWishlisted.length) {
	    	   wishlistBtn.classList.add("swym-added");
		    } else {
			   wishlistBtn.classList.remove("swym-added");
		    }
		});
    });
	
    $('.wishlist-toggle').each(function(){

        var $this = $(this);

        var currentProduct = $this.data('product');

        currentProduct = currentProduct.toString();

        $(this).on('click',function(e){
            e.preventDefault();
			console.log(e, currentProduct);
			var dataSet = e.currentTarget.dataset;
			var imageContainer = document.querySelector(".woocommerce-product-gallery__image--placeholder");
			var iu = imageContainer && imageContainer.firstChild.getAttribute("src");
			var currentButton = e.currentTarget;
			_swat.ui.performAddToWishlist({
				empi: dataSet.product,
				epi: currentVariantId || dataSet.product,
				du: dataSet.du,
				pr: dataSet.price,
				et: 4,
				iu: iu || "",
				dt: dataSet.dt,
				_cv: true
			}, function() {
				currentButton.classList.add("swym-added");
			}, function(err) { console.error(err); })
        });
    });

})(jQuery);

(function($){

    "use strict";

    /*
        1. Add product to wishlist
        2. Display wishlist items in the table
        3. Remove product from the wishlist

    */
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
		      var isWishlisted = res.filter(r => r.empi === +productId);
     		  if (isWishlisted.length) {
	    		  wb.classList.add("swym-added");
		      }	 
		   });
	   })
   }
  window.swymJSWCLoad();

	
	
	
	
	
	
	
	
	
    Array.prototype.unique = function() {
      return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    }

    function isInArray(value, array) {return array.indexOf(value) > -1;}

    function onWishlistComplete(target, title){
        setTimeout(function(){
            target
            .removeClass('loading')
            .addClass('active')
            .attr('title',title);
        },800);
    }

    function highlightWishlist(wishlist,title){
        $('.wishlist-toggle').each(function(){
            var $this = $(this);
            var currentProduct = $this.data('product');
            currentProduct = currentProduct.toString();
            if (isInArray(currentProduct,wishlist)) {
                $this.addClass('active').attr('title',title);
            }
        });
    }
	var opt = {}
    var shopName   = opt.shopName+'-wishlist',
        inWishlist = opt.inWishlist,
        restUrl    = opt.restUrl,
        wishlist   = new Array,
        ls         = sessionStorage.getItem(shopName),
        loggedIn   = ($('body').hasClass('logged-in')) ? true : false,
        userData   = '';

    if(false) {
        // Fetch current user data
        $.ajax({
            type: 'POST',
            url: opt.ajaxUrl,
            data: {
                'action' : 'fetch_user_data',
                'dataType': 'json'
            },
            success:function(data) {
                userData = JSON.parse(data);
                if (typeof(userData['wishlist']) != 'undefined' && userData['wishlist'] != null && userData['wishlist'] != "") {

                    var userWishlist = userData['wishlist'];
                    userWishlist = userWishlist.split(',');

                    if (wishlist.length) {
                        wishlist =  wishlist.concat(userWishlist);

                        $.ajax({
                            type: 'POST',
                            url:opt.ajaxPost,
                            data:{
                                action:'user_wishlist_update',
                                user_id :userData['user_id'],
                                wishlist :wishlist.join(','),
                            }
                        });

                    } else {
                        wishlist =  userWishlist;
                    }

                    wishlist = wishlist.unique();

                    highlightWishlist(wishlist,inWishlist);
                    sessionStorage.removeItem(shopName);

                } else {
                    if (typeof(ls) != 'undefined' && ls != null) {
                        ls = ls.split(',');
                        ls = ls.unique();
                        wishlist = ls;
                    }

                    $.ajax({
                        type: 'POST',
                        url:opt.ajaxPost,
                        data:{
                            action:'user_wishlist_update',
                            user_id :userData['user_id'],
                            wishlist :wishlist.join(','),
                        }
                    })
                    .done(function(response) {
                        highlightWishlist(wishlist,inWishlist);
                        sessionStorage.removeItem(shopName);
                    });
                }
            },
            error: function(){
                console.log('No user data returned');
            }
        });
    } else {
        if (typeof(ls) != 'undefined' && ls != null) {
            ls = ls.split(',');
            ls = ls.unique();
            wishlist = ls;
        }
    }

    $('.wishlist-toggle').each(function(){

        var $this = $(this);

        var currentProduct = $this.data('product');

        currentProduct = currentProduct.toString();

//         if (!loggedIn && isInArray(currentProduct,wishlist)) {
//             $this.addClass('active').attr('title',inWishlist);
//         }

        $(this).on('click',function(e){
            e.preventDefault();
			console.log(e, currentProduct);
			var dataSet = e.currentTarget.dataset;
			var imageContainer = document.querySelector(".woocommerce-product-gallery__image--placeholder");
			var iu = imageContainer && imageContainer.firstChild.getAttribute("src");
			var currentButton = e.currentTarget;
			_swat.addToWishList({
				empi: dataSet.product,
				epi: dataSet.product,
				du: window.location.href,
				pr: dataSet.price,
				et: 4,
				iu: iu || "",
				_cv: true
			}, function() {
				currentButton.classList.add("swym-added");
			})
//             if (!$this.hasClass('active') && !$this.hasClass('loading')) {

//                 $this.addClass('loading');

//                 wishlist.push(currentProduct);
//                 wishlist = wishlist.unique();

//                 if (loggedIn) {
//                     // get user ID
//                     if (userData['user_id']) {
//                         $.ajax({
//                             type: 'POST',
//                             url:opt.ajaxPost,
//                             data:{
//                                 action:'user_wishlist_update',
//                                 user_id :userData['user_id'],
//                                 wishlist :wishlist.join(','),
//                             }
//                         })
//                         .done(function(response) {
//                             onWishlistComplete($this, inWishlist);
//                         })
//                         .fail(function(data) {
//                             alert(opt.error);
//                         });
//                     }
//                 } else {

//                     sessionStorage.setItem(shopName, wishlist.toString());
//                     onWishlistComplete($this, inWishlist);

//                 }

//             }


        });
    });

    setTimeout(function(){

        if (wishlist.length) {

            restUrl += '?include='+wishlist.join(',');
            restUrl += '&per_page='+wishlist.length;

            $.ajax({
                dataType: 'json',
                url:restUrl
            })
            .done(function(response){
                $('.wishlist-table').each(function(){
                    var $this = $(this);
                    $.each(response,function(index,object){
                        $this.append('<tr data-product="'+object.id+'"><td><a class="wishlist-remove" href="#" title="'+opt.removeWishlist+'"></a>'+object.image+'</td><td>'+object.title["rendered"]+'</td><td>'+object.price+'</td><td>'+object.stock+'</td><td><a class="details" href="'+object.link+'">'+opt.buttonText+'</a></td></tr>');
                    });
                });
            })
            .fail(function(response){
                alert(opt.noWishlist);
            })
            .always(function(response){
                $('.wishlist-table').each(function(){
                    $(this).removeClass('loading');
                });
            });

        } else {
            $('.wishlist-table').each(function(){
                $(this).removeClass('loading');
            });
        }

    },1000);

    $(document).on('click', '.wishlist-remove', function(){

        var $this = $(this);

        $this.closest('table').addClass('loading');

        wishlist = [];

        $this.closest('table').find('tr').each(function(){

            if ($(this).data('product') != $this.closest('tr').data('product')) {

                wishlist.push($(this).data('product'));

                if (loggedIn) {

                    // get user ID
                    if (userData['user_id']) {
                        $.ajax({
                            type: 'POST',
                            url:opt.ajaxPost,
                            data:{
                                action:'user_wishlist_update',
                                user_id :userData['user_id'],
                                wishlist :wishlist.join(','),
                            }
                        })
                        .done(function(response) {
                            $this.closest('table').removeClass('loading');
                            $this.closest('tr').remove();
                        })
                        .fail(function(data) {
                            alert(opt.error);
                        });
                    }
                } else {
                    sessionStorage.setItem(shopName, wishlist.toString());
                    setTimeout(function(){
                        $this.closest('table').removeClass('loading');
                        $this.closest('tr').remove();
                    },500);
                }
            }

        });

    });

})(jQuery);

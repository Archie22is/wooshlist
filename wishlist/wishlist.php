/*
    Plugin Name: Woocommerce wishlist
    Plugin URI: https://www.enovathemes.com
    Description: Ajax wishlist for WooCommerce
    Author: Enovathemes
    Version: 1.0
    Author URI: http://enovathemes.com
*/
 
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_action('init','plugin_init');
function plugin_init(){
    if (class_exists("Woocommerce")) {
    // Code here
    }
}
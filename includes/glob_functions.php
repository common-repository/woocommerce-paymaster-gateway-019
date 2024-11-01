<?php
	function url_for_return_list($inv_id, $pm_id = NULL) {
		global $woocommerce;
			
		$thiser = new WC_paymaster;
		
		$arg['login'] =  $thiser->get_option('paymaster_robo_login');
		$arg['password'] =  $thiser->get_option('paymaster_robo_pass');
		$arg['nonce'] = wp_create_nonce( $inv_id.current_time('timestamp').rand(1,3));
		$arg['accountID'] = $thiser->get_option('account_id');
	if($pm_id==NULL) {
		$argu['paymentID'] = get_post_meta($inv_id, '_order_id_in_paymaster', true);
	} else {
		$argu['paymentID'] = $pm_id;
	}
		$arg['periodFrom'] = '';
		$arg['periodTo'] = '';
		$arg['externalID'] = '';

		$str = $arg['login'].";".$arg['password'].";".$arg['nonce'].";".$arg['accountID'].";".$argu['paymentID'].";".$arg['periodFrom'].";".$arg['periodTo'].";".$arg['externalID'];

		$hash = base64_encode(sha1($str, true));
		$returns['url'] = 'https://paymaster.ru/partners/rest/listRefunds?'.http_build_query($arg).'&hash='.$hash.'&paymentID='.$argu['paymentID'];
		$returns['arg'] = $arg;
		return $returns;
		}		
?>
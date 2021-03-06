<?php
/**
 * @file
 * amazee.io Drupal 8 production environment configuration file.
 *
 * This file will only be included on production environments.
 *
 * It contains some defaults that the amazee.io team suggests, please edit them as required.
 */

// Don't show any error messages on the site (will still be shown in watchdog)
$config['system.logging']['error_level'] = 'hide';

// Expiration of cached pages on Varnish to 15 min
$config['system.performance']['cache']['page']['max_age'] = 900;

// Aggregate CSS files on
$config['system.performance']['css']['preprocess'] = 1;

// Aggregate JavaScript files on
$config['system.performance']['js']['preprocess'] = 1;

// Sets Mailchimp API key
$config['mailchimp.settings']['api_key'] = getenv('AMAZEEIO_MAILCHIMP_API_KEY');

// Enable Tag Manager
 $config['e3_google_tag.settings']['gtm_code'] = 'GTM-PQPMKR5';

// Configure private and temp directories
$settings['file_private_path'] = "sites/default/files/private";
$config['system.file']['path']['temporary'] = "sites/default/files/private/tmp";

// Stripe production API config
$config['commerce_payment.commerce_payment_gateway.stripe']['configuration']['mode'] = 'live';
$config['commerce_payment.commerce_payment_gateway.stripe']['configuration']['publishable_key'] = getenv('AMAZEEIO_STRIPE_PK');
$config['commerce_payment.commerce_payment_gateway.stripe']['configuration']['secret_key'] = getenv('AMAZEEIO_STRIPE_SK');
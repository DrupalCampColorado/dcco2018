<?php
/**
 * @file
 * amazee.io Drupal 8 development environment configuration file.
 *
 * This file will only be included on development environments.
 *
 * It contains some defaults that the amazee.io team suggests, please edit them as required.
 */

// Show all error messages on the site
$config['system.logging']['error_level'] = 'all';

// Aggregate CSS files off
$config['system.performance']['css']['preprocess'] = 1;

// Aggregate JavaScript files off
$config['system.performance']['js']['preprocess'] = 1;

// Sets Mailchimp API key
$config['mailchimp.settings']['api_key'] = getenv('AMAZEEIO_MAILCHIMP_API_KEY');

// Configure shield for dev environment.
$config['shield.settings']['user'] = 'dcco';
$config['shield.settings']['pass'] = '3ditdcco';

// Configure private and temp directories
$settings['file_private_path'] = "sites/default/files/private";
$config['system.file']['path']['temporary'] = "sites/default/files/private/tmp";
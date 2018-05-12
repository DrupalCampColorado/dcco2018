<?php

namespace Drupal\dcco_sessions\EventSubscriber;

use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Path\PathMatcher;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\Core\Session\AccountProxy;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Url;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

/**
 * Class SessionSubmissionRedirectSubscriber.
 *
 * Shamelessly borrowing from anonyomuse_login module with some tweaks.
 *
 * @package Drupal\dcco_sessoins
 */
class SessionSubmissionRedirectSubscriber implements EventSubscriberInterface {

  /**
   * The configuration object factory.
   *
   * @var \Drupal\Core\Config\ConfigFactory
   */
  protected $configFactory;

  /**
   * The state system.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * The instantiated account.
   *
   * @var \Drupal\Core\Session\AccountProxy
   */
  protected $currentUser;

  /**
   * The path matcher.
   *
   * @var \Drupal\Core\Path\PathMatcher
   */
  protected $pathMatcher;

  /**
   * The path alias manager.
   *
   * @var \Drupal\Core\Path\AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * The module handler.
   *
   * @var \Drupal\Core\Extension\ModuleHandlerInterface
   */
  protected $moduleHandler;

  /**
   * The path validator service.
   *
   * @var \Drupal\Core\Path\PathValidatorInterface
   */
  protected $pathValidator;

  /**
   * Paths textarea line break.
   *
   * @var string
   */
  protected $pathsLineBreak = "\n";

  /**
   * Constructor of a new SessionSubmissionRedirectSubscriber.
   *
   * @param \Drupal\Core\Config\ConfigFactory $config_factory
   *   The configuration object factory.
   * @param \Drupal\Core\State\StateInterface $state
   *   The state system.
   * @param \Drupal\Core\Session\AccountProxy $current_user
   *   The instantiated account.
   * @param \Drupal\Core\Path\PathMatcher $path_matcher
   *   The path matcher.
   * @param \Drupal\Core\Path\AliasManagerInterface $alias_manager
   *   The path alias manager.
   * @param \Drupal\Core\Extension\ModuleHandlerInterface $module_handler
   *   The module handler.
   * @param \Drupal\Core\Path\PathValidatorInterface $path_validator
   *   The path validator service.
   */
  public function __construct(
    ConfigFactory $config_factory,
    StateInterface $state,
    AccountProxy $current_user,
    PathMatcher $path_matcher,
    AliasManagerInterface $alias_manager,
    ModuleHandlerInterface $module_handler,
    PathValidatorInterface $path_validator
  ) {
    $this->configFactory = $config_factory;
    $this->state = $state;
    $this->currentUser = $current_user;
    $this->pathMatcher = $path_matcher;
    $this->aliasManager = $alias_manager;
    $this->moduleHandler = $module_handler;
    $this->pathValidator = $path_validator;
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[KernelEvents::REQUEST][] = ['redirect', 100];
    return $events;
  }

  /**
   * Perform the anonymous user redirection, if needed.
   *
   * This method is called whenever the KernelEvents::REQUEST event is
   * dispatched.
   *
   * @param \Symfony\Component\HttpKernel\Event\GetResponseEvent $event
   *   The Event to process.
   */
  public function redirect(GetResponseEvent $event) {
    // Skip if maintenance mode is enabled.
    if ($this->state->get('system.maintenance_mode')) { return; }

    // Skip if running from the command-line.
    if (PHP_SAPI === 'cli') { return; }

    // Get current request.
    $request = $event->getRequest();

    // Determine the current path and alias.
    $current_path = $request->getPathInfo();

    if (
      $current_path == '/node/add/session' &&
      $this->currentUser->isAnonymous()
    ) {
      drupal_set_message('Please register before submitting your session.');
      $response = new RedirectResponse('/register', 301);
      $event->setResponse($response);
      $event->stopPropagation();
    }
  }

}

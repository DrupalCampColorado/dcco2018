<?php

namespace Drupal\dcco_sessions\EventSubscriber;

use Drupal\Core\Url;
use Drupal\Core\Session\AccountProxy;
use Drupal\Core\State\StateInterface;
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
   * Constructor of a new SessionSubmissionRedirectSubscriber.
   *
   * @param \Drupal\Core\State\StateInterface $state
   *   The state system.
   * @param \Drupal\Core\Session\AccountProxy $current_user
   *   The instantiated account.
   */
  public function __construct(StateInterface $state, AccountProxy $current_user) {
    $this->state = $state;
    $this->currentUser = $current_user;
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
      $login_route = Url::fromRoute('user.login');
      drupal_set_message(t('Please register for the camp below or <a href="@login_path">login</a> to submit your session.', [
        '@login_path' => '/' . $login_route->getInternalPath(),
      ]));

      $response = new RedirectResponse('/register', 301);
      $event->setResponse($response);
      $event->stopPropagation();
    }
  }

}

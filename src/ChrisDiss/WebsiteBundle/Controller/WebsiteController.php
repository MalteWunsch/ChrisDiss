<?php

namespace ChrisDiss\WebsiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Main Controller for the website.
 */
class WebsiteController extends Controller
{
    /**
     * First page where a users enters.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render('ChrisDissWebsiteBundle:Website:index.html.twig');
    }
}

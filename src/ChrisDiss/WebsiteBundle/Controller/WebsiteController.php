<?php

namespace ChrisDiss\WebsiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

/**
 * Main Controller for the website.
 */
class WebsiteController extends Controller
{
    /**
     * First page where a users enters displaying the instructions.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function initialInstructionsAction()
    {
        return $this->render('ChrisDissWebsiteBundle:Website:initialInstructions.html.twig');
    }
}

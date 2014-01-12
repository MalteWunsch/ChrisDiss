<?php

namespace ChrisDiss\WebsiteBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use ChrisDiss\WebsiteBundle\Entity\User;

/**
 * Main Controller for the website.
 */
class WebsiteController extends Controller
{
    /**
     * Page where a users initially enters their personal code.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function codeFormAction(Request $request)
    {
        $user = new User();
        $form = $this->createForm(
            'code',
            $user,
            array('action' => $this->generateUrl($request->attributes->get('_route')))
        );

        $form->handleRequest($request);
        if ($form->isValid()) {
            // @TODO: session
        }

        return $this->render(
            'ChrisDissWebsiteBundle:Website:codeForm.html.twig',
            array('form' => $form->createView())
        );
    }

    /**
     * Page where a users enters displaying the instructions.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function instructionsAction()
    {
        return $this->render('ChrisDissWebsiteBundle:Website:instructions.html.twig');
    }

    /**
     * After reading the initial instructions, a user takes a dry run to get to know the quiz mechanics.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function dryRunAction()
    {
        return $this->render('ChrisDissWebsiteBundle:Website:dryRun.html.twig');
    }

    /**
     * After the dry run, a user takes the real test.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function testAction()
    {
        return $this->render('ChrisDissWebsiteBundle:Website:test.html.twig');
    }
}

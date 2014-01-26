<?php

namespace ChrisDiss\WebsiteBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use ChrisDiss\WebsiteBundle\Entity\User;
use Symfony\Component\HttpFoundation\Response;

/**
 * Main Controller for the website.
 *
 * @TODO: Replace the silly home brewed authentication and authorization with the Symfony security component to improve
 * separation of concerns, possibly security and ship less own code.
 */
class WebsiteController extends Controller
{
    /**
     * Page where a users initially enters their personal code to log in, for being able to access other pages. Upon
     * requesting this page, a user is implicitly logged out.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function codeFormAction(Request $request)
    {
        $session = $request->getSession();
        $session->remove('user');

        $user = new User();
        $form = $this->createForm(
            'code',
            $user,
            array('action' => $this->generateUrl($request->attributes->get('_route')))
        );

        $form->handleRequest($request);
        if ($form->isValid()) {
            $session->set('user', $user);
            return $this->redirect($this->generateUrl('instructions'));
        }

        return $this->render(
            'ChrisDissWebsiteBundle:Website:codeForm.html.twig',
            array('form' => $form->createView())
        );
    }

    /**
     * Page where a users enters displaying the instructions.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function instructionsAction(Request $request)
    {
        $session = $request->getSession();
        if (!($session->get('user') instanceof User)) {
            return $this->redirect($this->generateUrl('codeForm'));
        }

        return $this->render('ChrisDissWebsiteBundle:Website:instructions.html.twig');
    }

    /**
     * After reading the initial instructions, a user takes a dry run to get to know the quiz mechanics.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function dryRunAction(Request $request)
    {
        $session = $request->getSession();
        if (!($session->get('user') instanceof User)) {
            return $this->redirect($this->generateUrl('codeForm'));
        }

        return $this->render('ChrisDissWebsiteBundle:Website:dryRun.html.twig');
    }

    /**
     * After the dry run, a user takes the real test.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function testAction(Request $request)
    {
        $session = $request->getSession();
        if (!($session->get('user') instanceof User)) {
            return $this->redirect($this->generateUrl('codeForm'));
        }

        return $this->render('ChrisDissWebsiteBundle:Website:test.html.twig');
    }

    /**
     * After the test, save it's result. This action is called via AJAX only.
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function saveResultAction(Request $request)
    {
        $session = $request->getSession();
        if (!($session->get('user') instanceof User)) {
            return $this->redirect($this->generateUrl('codeForm'));
        }

        /* @var $user User */
        $user = $session->get('user');
        $user->setMarkedWrongAnswers((int) $request->get('markedWrongAnswers'))
             ->setUnmarkedWrongAnswers((int) $request->get('unmarkedWrongAnswers'))
             ->setMarkedCorrectAnswers((int) $request->get('markedCorrectAnswers'))
             ->setUnmarkedCorrectAnswers((int) $request->get('unmarkedCorrectAnswers'))
             ->setNoAnswers((int) $request->get('noAnswers'))
             ->setCreatedAt(new \DateTime());

        /* @var $om \Doctrine\Common\Persistence\ObjectManager */
        $om = $this->getDoctrine()
                   ->getManager();
        $om->persist($user);
        $om->flush();

        return new Response();
    }
}

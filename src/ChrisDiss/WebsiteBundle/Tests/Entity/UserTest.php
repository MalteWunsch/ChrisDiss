<?php

namespace ChrisDiss\WebsiteBundle\Tests\Entity;

use ChrisDiss\WebsiteBundle\Entity\User;

/**
 * Tests for the User entity.
 */
class UserTest extends \PHPUnit_Framework_TestCase
{
    /**
     * System under test.
     *
     * @var \ChrisDiss\WebsiteBundle\Entity\User
     */
    private $entity;

    /**
     * {@inheritDoc}
     * @see \PHPUnit_Framework_TestCase::setUp()
     */
    protected function setUp()
    {
        parent::setUp();
        $this->entity = new User();
    }

    /**
     * {@inheritDoc}
     * @see \PHPUnit_Framework_TestCase::tearDown()
     */
    protected function tearDown()
    {
        $this->entity = null;
        parent::tearDown();
    }

    /**
     * Ensures getCode() gets what was set with setCode() in a fine example.
     */
    public function testGetAndSetCodeWorkFineInFineExample()
    {
        $expected = 'test';
        $this->assertNotSame($expected, $this->entity->getCode(), 'Test prerequisite not met.');

        $this->entity->setCode($expected);
        $this->assertSame($expected, $this->entity->getCode());
    }

    /**
     * Ensures setCode() has a fluent interface, i.e. returns the object operated upon.
     */
    public function testSetCodeHasFluentInterface()
    {
        $this->assertSame($this->entity, $this->entity->setCode(''));
    }

    /**
     * Ensures getMarkedWrongAnswers() gets what was set with setMarkedWrongAnswers() in a fine example.
     */
    public function testGetAndSetMarkedWrongAnswersWorkFineInFineExample()
    {
        $expected = 1;
        $this->assertNotSame($expected, $this->entity->getMarkedWrongAnswers(), 'Test prerequisite not met.');

        $this->entity->setMarkedWrongAnswers($expected);
        $this->assertSame($expected, $this->entity->getMarkedWrongAnswers());
    }

    /**
     * Ensures setMarkedWrongAnswers() has a fluent interface, i.e. returns the object operated upon.
     */
    public function testSetMarkedWrongAnswersHasFluentInterface()
    {
        $this->assertSame($this->entity, $this->entity->setMarkedWrongAnswers(1));
    }

    /**
     * Ensures getUnmarkedWrongAnswers() gets what was set with setUnmarkedWrongAnswers() in a fine
     * example.
     */
    public function testGetAndSetUnmarkedWrongAnswersWorkFineInFineExample()
    {
        $expected = 1;
        $this->assertNotSame($expected, $this->entity->getUnmarkedWrongAnswers(), 'Test prerequisite not met.');

        $this->entity->setUnmarkedWrongAnswers($expected);
        $this->assertSame($expected, $this->entity->getUnmarkedWrongAnswers());
    }

    /**
     * Ensures setUnmarkedWrongAnswers() has a fluent interface, i.e. returns the object operated upon.
     */
    public function testSetUnmarkedWrongAnswersHasFluentInterface()
    {
        $this->assertSame($this->entity, $this->entity->setUnmarkedWrongAnswers(1));
    }

    /**
     * Ensures getMarkedCorrectAnswers() gets what was set with setMarkedCorrectAnswers() in a fine example.
     */
    public function testGetAndSetMarkedCorrectAnswersWorkFineInFineExample()
    {
        $expected = 1;
        $this->assertNotSame($expected, $this->entity->getMarkedCorrectAnswers(), 'Test prerequisite not met.');

        $this->entity->setMarkedCorrectAnswers($expected);
        $this->assertSame($expected, $this->entity->getMarkedCorrectAnswers());
    }

    /**
     * Ensures setMarkedCorrectAnswers() has a fluent interface, i.e. returns the object operated upon.
     */
    public function testSetMarkedCorrectAnswersHasFluentInterface()
    {
        $this->assertSame($this->entity, $this->entity->setMarkedCorrectAnswers(1));
    }

    /**
     * Ensures getUnmarkedCorrectAnswers() gets what was set with setUnmarkedCorrectAnswers() in a fine example.
     */
    public function testGetAndSetUnmarkedCorrectAnswersWorkFineInFineExample()
    {
        $expected = 1;
        $this->assertNotSame($expected, $this->entity->getUnmarkedCorrectAnswers(), 'Test prerequisite not met.');

        $this->entity->setUnmarkedCorrectAnswers($expected);
        $this->assertSame($expected, $this->entity->getUnmarkedCorrectAnswers());
    }

    /**
     * Ensures setUnmarkedCorrectAnswers() has a fluent interface, i.e. returns the object operated upon.
     */
    public function testSetUnmarkedCorrectAnswersHasFluentInterface()
    {
        $this->assertSame($this->entity, $this->entity->setUnmarkedCorrectAnswers(1));
    }

    /**
     * Ensures getCreatedAt() gets what was set with setCreatedAt() in a fine example.
     */
    public function testGetAndSetCreatedAtWorkFineInFineExample()
    {
        $expected = new \DateTime();
        $this->assertNotSame($expected, $this->entity->getCreatedAt(), 'Test prerequisite not met.');

        $this->entity->setCreatedAt($expected);
        $this->assertSame($expected, $this->entity->getCreatedAt());
    }

    /**
     * Ensures setCreatedAt() has a fluent interface, i.e. returns the object operated upon.
     */
    public function testSetCreatedAtHasFluentInterface()
    {
        $this->assertSame($this->entity, $this->entity->setCreatedAt(new \DateTime()));
    }
}

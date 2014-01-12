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
        $this->assertNotSame($expected, $this->entity->getCode(), 'Test prerequiste not met.');

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
}

<?php

namespace ChrisDiss\WebsiteBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;

/**
 * A "logged in" user, authenticated by their personal code (which maybe is not unique).
 */
class User
{
    /**
     * Personal identification code of the user, which doesn't have to be unique by itself, but should be in combination
     * with other data like input time.
     *
     * @Assert\NotBlank()
     * @Assert\Length(min = 5, max = 5)
     *
     * @var string
     */
    protected $code;

    /**
     * Sets the personal identification code of the user, which may doesn't have to be unique by itself.
     *
     * @param string $code
     * @return $this fluent interface
     */
    public function setCode($code)
    {
        $this->code = $code;
        return $this;
    }

    /**
     * Gets the personal identification code of the user, which doesn't have to be unique by itself.
     *
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }
}

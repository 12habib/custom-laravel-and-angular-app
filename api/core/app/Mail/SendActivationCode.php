<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendActivationCode extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = "Verify your account";
        $from = "apps@digcy.io";
        $reply_to = "apps@digcy.io";
        $from_name = "Digcy Apps"; // @TODO: change to Individufy Info
        return $this->view('emails.account.activation_code')
            ->from($from, $from_name)
            ->subject($subject)
            ->replyTo($reply_to);

    }
}

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class URLModel extends Model
{
    // this is a business/static data model
    // does not do any DB stuff

    // const FRONT_URL = 'http://localhost:4200';
    // const DASH_URL = 'http://localhost:4300';

   const FRONT_URL = 'https://learn.myedugami.com';
   const DASH_URL = 'https://admin.myedugami.com';
}

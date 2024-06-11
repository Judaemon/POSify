<?php

use Laravel\Dusk\Browser;

// test('basic example', function () {
//     $this->browse(function (Browser $browser) {
//         $browser->visit('https://www.youtube.com')
//                 ->screenshot('sample screenshot')
//                 ->assertSee('Try searching to get started');
//     });
// });

test('basic example', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/')
                ->screenshot('sample screenshot')
                // ->press('Increment')
                // ->screenshot('sample screenshot 1')
                ->assertSee('POSify');
    });
});

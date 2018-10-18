<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeNullables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->string('city')->nullable()->change();
            $table->string('country')->nullable()->change();
            $table->string('bio')->nullable()->change();
        });

        Schema::table('funds', function (Blueprint $table) {
            $table->string('prospectus')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_profiles', function (Blueprint $table) {
            $table->string('city')->change();
        });

        Schema::table('funds', function (Blueprint $table) {
            $table->string('prospectus')->change();
        });
    }
}

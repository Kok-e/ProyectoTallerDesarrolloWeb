<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInteraccionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interacciones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('perro_interesado_id');
            $table->unsignedBigInteger('perro_candidato_id');
            $table->string('preferencia'); // Asumimos que preferencia será un campo de tipo cadena (aceptado o rechazado)
            // Agregar cualquier otro campo adicional que puedas necesitar

            // Llaves foráneas
            $table->foreign('perro_interesado_id')->references('id')->on('perroDB');
            $table->foreign('perro_candidato_id')->references('id')->on('perroDB');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('interacciones');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerroModel extends Model
{
    use HasFactory;

    protected $table = 'perroDB'; // Nombre de la tabla en la base de datos (si es diferente a "perro_models")
    protected $primaryKey = 'id'; // Nombre de la clave primaria (si es diferente a "id")
    public $timestamps = true; // Desactivar las columnas created_at y updated_at

    protected $fillable = [
        "nombre",
        "url_foto",
        "descripcion"
    ]; // Lista de atributos asignables

    
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InteraccionModel extends Model
{
    use HasFactory;

    protected $table = 'interacciones'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Nombre de la clave primaria
    public $timestamps = false; // No necesitamos las columnas created_at y updated_at

    protected $fillable = [
        'perro_interesado_id',
        'perro_candidato_id',
        'preferencia',
    ]; // Lista de atributos asignables

    // Relación con el modelo PerroModel para obtener los datos del perro interesado
    public function perroInteresado()
    {
        return $this->belongsTo(PerroModel::class, 'perro_interesado_id', 'id');
    }

    // Relación con el modelo PerroModel para obtener los datos del perro candidato
    public function perroCandidato()
    {
        return $this->belongsTo(PerroModel::class, 'perro_candidato_id', 'id');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PerroModel;

class PerroController extends Controller
{
    // Mostrar todos los perros
    public function index()
    {
        $perros = PerroModel::all();
        return view('perros.index', compact('perros'));
    }

    // Mostrar el formulario para crear un nuevo perro
    public function create()
    {
        return view('perros.create');
    }

    // Almacenar un nuevo perro en la base de datos
    public function store(Request $request)
    {
        $perro = PerroModel::create($request->all());
        return redirect()->route('perros.index')->with('success', 'Perro creado exitosamente.');
    }

    // Mostrar un perro específico
    public function show($id)
    {
        $perro = PerroModel::find($id);
        return view('perros.show', compact('perro'));
    }

    // Mostrar el formulario para editar un perro específico
    public function edit($id)
    {
        $perro = PerroModel::find($id);
        return view('perros.edit', compact('perro'));
    }

    // Actualizar un perro específico en la base de datos
    public function update(Request $request, $id)
    {
        $perro = PerroModel::find($id);
        $perro->update($request->all());
        return redirect()->route('perros.index')->with('success', 'Perro actualizado exitosamente.');
    }

    // Eliminar un perro específico de la base de datos
    public function destroy($id)
    {
        PerroModel::destroy($id);
        return redirect()->route('perros.index')->with('success', 'Perro eliminado exitosamente.');
    }
    // Mostrar las interacciones de un perro específico
public function showInteracciones($id)
{
    $perro = PerroModel::find($id);
    $interacciones = $perro->interacciones;
    return view('perros.interacciones', compact('perro', 'interacciones'));
}

// Almacenar una nueva interacción en la base de datos
public function storeInteraccion(Request $request)
{
    $interaccion = InteraccionModel::create($request->all());
    return redirect()->route('perros.show', $request->perro_interesado_id)
                     ->with('success', 'Interacción creada exitosamente.');
}

}

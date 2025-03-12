<?php
namespace App\Http\Controllers;

use App\Models\Node;
use Illuminate\Http\Request;

class NodeController extends Controller
{
    public function index()
    {
        $nodes = Node::get();
        return response()->json($nodes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:nodes,id',
        ]);

        $node = Node::create($request->all());

        $nodes = Node::all();
        return response()->json($nodes);
    }

    public function destroy($id)
    {
        $node = Node::findOrFail($id);
        $node->delete();
        return response()->json(['message' => 'Node deleted']);
    }
}


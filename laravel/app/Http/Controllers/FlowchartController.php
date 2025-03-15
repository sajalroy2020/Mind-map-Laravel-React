<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI;
use App\Models\Flowchart;

class FlowchartController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'topic' => 'required|string'
        ]);

        // Generate flowchart with OpenAI
        $client = OpenAI::client(env('OPENAI_API_KEY'));
        
        $response = $client->completions()->create([
            'model' => 'text-davinci-003',
            'prompt' => "Generate a flowchart in JSON format for: " . $request->topic . 
                        ". Use format: { elements: [{ id: '1', type: 'input', data: { label: 'Start' }, position: { x: 0, y: 0 } }, ...]}",
            'max_tokens' => 1000
        ]);

        $flowchartData = json_decode(trim($response->choices[0]->text), true);

        // Save to database
        $flowchart = Flowchart::create([
            'topic' => $request->topic,
            'chart_data' => $flowchartData
        ]);

        return response()->json($flowchartData);
    }
}

from fastapi import FastAPI, Request
import subprocess
import json
import datetime

app = FastAPI()
history = []

@app.post("/chat")
async def chat(req: Request):
    body = await req.json()
    prompt = body.get("prompt", "")
    timestamp = datetime.datetime.now().isoformat()

    result = subprocess.run(
        ["ollama", "run", "gpt-oss:20b"],
        input=prompt.encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    output = result.stdout.decode()
    history.append({"timestamp": timestamp, "prompt": prompt, "response": output})

    with open("chat_log.json", "w") as log_file:
        json.dump(history, log_file, indent=2)

    return {"response": output}

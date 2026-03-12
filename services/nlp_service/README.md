# NLP Service

FastAPI microservice for extracting structured opportunities and recommendation matching.

## Run locally

Use Python 3.11 or 3.12 for best package compatibility.

```bash
cd services/nlp_service
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Endpoints

- `POST /extract`
- `POST /recommend-match`
- `GET /health`

Set backend env var:

- `NLP_SERVICE_URL=http://localhost:8000`

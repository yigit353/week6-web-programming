"""
test_genre.py - Regression test for genre field in book creation
================================================================

Verifies that the genre field sent during book creation is persisted
and returned in the API response. This was a bug where genre was
accepted in the UI but never sent to the backend, and the backend
hardcoded genre to an empty string.
"""

import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlmodel.pool import StaticPool

from main import app
from database import get_session


@pytest.fixture(name="session")
def session_fixture():
    """Create an in-memory SQLite database for each test."""
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture(session):
    """Provide a TestClient that uses the in-memory database."""

    def get_session_override():
        return session

    app.dependency_overrides[get_session] = get_session_override
    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


def _create_author(client):
    """Helper: create an author and return their id."""
    resp = client.post("/authors", json={"name": "Test Author"})
    assert resp.status_code == 201
    return resp.json()["id"]


def test_create_book_with_genre(client):
    """Genre value sent in POST /books should be persisted and returned."""
    author_id = _create_author(client)

    resp = client.post("/books", json={
        "title": "Test Book",
        "author_id": author_id,
        "price": 19.99,
        "isbn": "1234567890",
        "genre": "Non-Fiction",
        "stock": 5,
    })

    assert resp.status_code == 201
    data = resp.json()
    assert data["genre"] == "Non-Fiction"


def test_create_book_genre_default_empty(client):
    """When genre is omitted, it should default to empty string."""
    author_id = _create_author(client)

    resp = client.post("/books", json={
        "title": "Another Book",
        "author_id": author_id,
        "price": 9.99,
        "isbn": "0987654321",
        "stock": 3,
    })

    assert resp.status_code == 201
    data = resp.json()
    assert data["genre"] == ""

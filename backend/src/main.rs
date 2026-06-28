use axum::{Router, Json, extract::Query};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct ManualQuery { q: Option<String> }
#[derive(Serialize)]
struct Manual { id: String, title: String, brand: String, model: String, pages: u32, pdf_url: String }

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    let app = Router::new()
        .route("/", axum::routing::get(root))
        .route("/health", axum::routing::get(health))
        .route("/manuals", axum::routing::get(search_manuals))
        .layer(tower_http::cors::CorsLayer::permissive());
    let port = std::env::var("PORT").unwrap_or_else(|_| "3001".into());
    let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", port)).await.unwrap();
    tracing::info!("manualslib backend running on :{}", port);
    axum::serve(listener, app).await.unwrap();
}

async fn root() -> Json<serde_json::Value> { Json(serde_json::json!({"service": "manualslib", "status": "running"})) }
async fn health() -> Json<serde_json::Value> { Json(serde_json::json!({"status": "healthy"})) }

async fn search_manuals(Query(q): Query<ManualQuery>) -> Json<serde_json::Value> {
    let query = q.q.unwrap_or_else(|| "printer".into());
    let manuals = vec![
        Manual { id: "1".into(), title: format!("{} User Manual", query), brand: "HP".into(), model: "LaserJet Pro".into(), pages: 245, pdf_url: "/manuals/hp-laserjet.pdf".into() },
        Manual { id: "2".into(), title: format!("{} Setup Guide", query), brand: "Canon".into(), model: "PIXMA".into(), pages: 128, pdf_url: "/manuals/canon-pixma.pdf".into() },
    ];
    Json(serde_json::json!({ "manuals": manuals, "query": query }))
}

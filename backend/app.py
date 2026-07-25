from flask import Flask, request
from flask_cors import CORS

from services.data_service import (
    get_summary,
    get_chart_data,
    get_country_data,
    get_country_list,
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {
        "project": "SustainAI Insight",
        "status": "Backend Running 🚀"
    }


@app.route("/api/summary")
def summary():
    country = request.args.get("country")

    if country == "All":
        country = None

    return get_summary(country)

@app.route("/api/chart")
def chart():
    country = request.args.get("country")
    print("Selected Country:", country)
    if country == "All":
        country = None

    return get_chart_data(country)


@app.route("/api/countries")
def countries():
    return get_country_data()


@app.route("/api/country-list")
def country_list():
    return get_country_list()


if __name__ == "__main__":
    app.run(debug=True)
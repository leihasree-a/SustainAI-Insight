import pandas as pd


file_path = "../datasets/climate_energy_cleaned.xlsx"
df = pd.read_excel(file_path)

def load_dataset():
    return df
def get_summary(country=None):

    df = load_dataset()
    if country:
        df = df[df["country"] == country]

    summary = {
    "total_records": len(df),
    "countries": df["country"].nunique(),
    "average_temperature": round(df["avg_temperature"].mean(), 2),
    "average_co2": round(df["co2_emission"].mean(), 2),
    "average_renewable": round(df["renewable_share"].mean(), 2),

    # Sustainability Score (0–100)
    "sustainability_score": min(
        100,
        max(
            0,
            round(
                (df["renewable_share"].mean() * 4)
                - (df["co2_emission"].mean() / 20),
                1,
            ),
        ),
    ),
}

    return summary


def get_chart_data(country=None):

    df = load_dataset()

    # Filter dataset if a country is selected
    if country:
        df = df[df["country"] == country]

    df["month"] = pd.to_datetime(df["date"])
    df["month"] = df["month"].dt.to_period("M").astype(str)

    chart = (
        df.groupby("month")
        .agg({
            "co2_emission": "mean",
            "renewable_share": "mean",
            "avg_temperature": "mean"
        })
        .reset_index()
    )

    return chart.to_dict(orient="records")


def get_country_data():

    df = load_dataset()

    country = (
        df.groupby("country")
        .agg({
            "co2_emission": "mean"
        })
        .sort_values(by="co2_emission", ascending=False)
        .head(10)
        .reset_index()
    )

    return country.to_dict(orient="records")


def get_country_list():

    df = load_dataset()

    countries = sorted(df["country"].unique().tolist())

    return countries
def get_ai_insight(country=None):

    df = load_dataset()

    if country:
        df = df[df["country"] == country]

    avg_co2 = df["co2_emission"].mean()
    avg_renewable = df["renewable_share"].mean()

    if avg_co2 > 470:
        co2_status = "high"
    elif avg_co2 > 400:
        co2_status = "moderate"
    else:
        co2_status = "low"

    if avg_renewable > 20:
        renewable_status = "excellent"
    elif avg_renewable > 15:
        renewable_status = "good"
    else:
        renewable_status = "low"

    if country:
        insight = (
            f"{country} has {co2_status} CO₂ emissions and "
            f"{renewable_status} renewable energy adoption. "
            "Increasing clean energy usage can further improve sustainability."
        )
    else:
        insight = (
            "Global sustainability analysis shows moderate CO₂ emissions with "
            "steady growth in renewable energy adoption across countries."
        )

    return {"insight": insight}
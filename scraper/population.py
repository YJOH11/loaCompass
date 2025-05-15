import requests
from bs4 import BeautifulSoup

def fetch_population_data():
    url = "https://lostats.net/population/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    table_rows = soup.select("table.table tr")[1:]  # 헤더 제외
    result = []

    for row in table_rows:
        cols = row.find_all("td")
        if len(cols) < 3:
            continue

        server_name = cols[0].text.strip()
        population_text = cols[1].text.strip().replace(",", "")
        change_text = cols[2].text.strip().replace("%", "").replace("+", "")

        try:
            population = int(population_text)
            change = float(change_text)
            if "-" in cols[2].text:
                change *= -1
        except ValueError:
            continue

        result.append({
            "server": server_name,
            "population": population,
            "change": change
        })

    return result
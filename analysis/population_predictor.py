import pandas as pd
from prophet import Prophet
from analysis.config import get_connection


def generate_population_summary():
    conn = get_connection()

    # 전체 데이터 로딩
    query = """
        SELECT server_name, DATE(recorded_at) AS date, character_name
        FROM character_record
    """
    df = pd.read_sql(query, conn)
    conn.close()

    df['date'] = pd.to_datetime(df['date'])
    summary = []

    # 1. 누적 기준 인구 1위 서버
    cumulative_df = df.groupby("server_name")["character_name"].nunique().reset_index(name="count")
    top = cumulative_df.sort_values(by="count", ascending=False).iloc[0]
    summary.append(f"🔥 {top['server_name']}은 현재 저장된 캐릭터 데이터 기준으로 가장 인구가 많은 서버입니다. (총 {top['count']}명)")

    # 2. 최근 2일간 증감률 분석
    count_df = df.groupby(["server_name", "date"])["character_name"].nunique().reset_index(name="count")

    for server in count_df["server_name"].unique():
        server_df = count_df[count_df["server_name"] == server].sort_values("date")
        if len(server_df) < 2:
            continue
        before = server_df.iloc[-2]["count"]
        after = server_df.iloc[-1]["count"]
        if before == 0:
            continue
        rate = ((after - before) / before) * 100

        if abs(rate) < 0.1:
            summary.append(f"🪘 {server}는 인구 변화가 거의 없습니다. (±0.0%)")
        elif rate > 0:
            summary.append(f"📈 {server}는 전날보다 +{rate:.1f}% 증가했습니다. ({int(before)}명 → {int(after)}명)")

    return summary


def generate_population_summary_short():
    conn = get_connection()

    # 전체 데이터 로딩
    query = """
        SELECT server_name, DATE(recorded_at) AS date, character_name
        FROM character_record
    """
    df = pd.read_sql(query, conn)
    conn.close()

    summary = []

    if df.empty:
        return ["⚠️ 데이터가 부족해 요약할 수 없습니다."]

    df['date'] = pd.to_datetime(df['date'], errors='coerce')
    if df['date'].isnull().all():
        return ["⚠️ 날짜 정보가 유효하지 않습니다."]

    #  1. 누적 기준 인구 1위 서버
    cumulative_df = df.groupby("server_name")["character_name"].nunique().reset_index(name="count")
    top_total = cumulative_df.sort_values(by="count", ascending=False).iloc[0]
    summary.append(f"🔥 {top_total['server_name']}은 현재 저장된 캐릭터 데이터 기준으로 가장 인구가 많은 서버입니다. (총 {top_total['count']}명)")

    #  2. 증감률 비교
    count_df = df.groupby(["server_name", "date"])["character_name"].nunique().reset_index(name="count")

    rates = []
    for server in count_df["server_name"].unique():
        server_df = count_df[count_df["server_name"] == server].sort_values("date")
        if len(server_df) < 2:
            continue
        before = server_df.iloc[-2]["count"]
        after = server_df.iloc[-1]["count"]
        if before == 0:
            continue
        rate = ((after - before) / before) * 100
        rates.append((server, before, after, rate))

    if rates:
        top_growth = max(rates, key=lambda x: x[3])
        summary.append(f"📈 {top_growth[0]}는 전날보다 +{top_growth[3]:.1f}% 증가했습니다. ({int(top_growth[1])}명 → {int(top_growth[2])}명)")
        least_change = min(rates, key=lambda x: abs(x[3]))
        summary.append(f"🪘 {least_change[0]}는 인구 변화가 거의 없습니다. (±{abs(least_change[3]):.1f}%)")

    return summary

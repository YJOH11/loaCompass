import pandas as pd
from analysis.config import get_connection

def generate_population_summary():
    conn = get_connection()

    #  1. 누적 기준 인구 분석
    total_query = """
        SELECT server_name, COUNT(DISTINCT character_name) AS total
        FROM character_record
        GROUP BY server_name
    """
    total_df = pd.read_sql(total_query, conn)

    #  2. 날짜별 인구 분석 (전날 대비 증가율 보기용)
    history_query = """
        SELECT server_name, DATE(recorded_at) AS date, COUNT(DISTINCT character_name) AS count
        FROM character_record
        GROUP BY server_name, DATE(recorded_at)
    """
    history_df = pd.read_sql(history_query, conn)
    conn.close()

    history_df['date'] = pd.to_datetime(history_df['date'])

    summary = []

    # 누적 기준 인구 1위 서버 출력
    top = total_df.sort_values(by="total", ascending=False).iloc[0]
    summary.append(
        f"🔥 {top['server_name']}은 현재 저장된 캐릭터 데이터 기준으로 가장 인구가 많은 서버입니다. (총 {top['total']}명)"
    )

    # 각 서버별 변화율 계산 (증가한 경우만 표시)
    for server in history_df['server_name'].unique():
        server_df = history_df[history_df['server_name'] == server].sort_values('date')
        if len(server_df) < 2:
            continue

        before = server_df.iloc[-2]['count']
        after = server_df.iloc[-1]['count']
        if before == 0:
            continue

        rate = ((after - before) / before) * 100

        if abs(rate) < 0.1:
            summary.append(f"🧘 {server}는 인구 변화가 거의 없습니다. (±0.0%)")
        elif rate > 0:
            summary.append(f"📈 {server}는 전날보다 +{rate:.1f}% 증가했습니다. ({before}명 → {after}명)")

        #  감소는 무시

    return summary

import pandas as pd
from prophet import Prophet
from analysis.config import get_connection

def forecast_top_server_growth():
    conn = get_connection()

    query = """
        SELECT server_name, DATE(recorded_at) AS ds, COUNT(DISTINCT character_name) AS y
        FROM character_record
        GROUP BY server_name, DATE(recorded_at)
    """
    df_all = pd.read_sql(query, conn)
    conn.close()

    df_all['ds'] = pd.to_datetime(df_all['ds'])
    summary = []

    for server in df_all['server_name'].unique():
        df = df_all[df_all['server_name'] == server][['ds', 'y']]
        if len(df) < 5:
            continue

        model = Prophet()
        model.fit(df)
        future = model.make_future_dataframe(periods=7)
        forecast = model.predict(future)

        y_last = df.iloc[-1]['y']
        y_pred = forecast.iloc[-1]['yhat']
        growth = y_pred - y_last

        print(f"[DEBUG] {server}: current={y_last:.1f}, forecast={y_pred:.1f}, increase={growth:.1f}")

        # 기준 완화: 0.5 이상 증가
        if growth >= 0.5:
            summary.append({
                'server': server,
                'current': y_last,
                'forecast': y_pred,
                'increase': growth
            })

    summary.sort(key=lambda x: x['increase'], reverse=True)
    top3 = summary[:3]

    result = []
    if top3:
        result.append("📈 다음 주 인구가 가장 많이 증가할 것으로 예상되는 서버는:")
        for idx, row in enumerate(top3, start=1):
            result.append(f"{idx}. {row['server']} (+{row['increase']:.1f}명 예상)")
    else:
        result.append("⚠️ 예측할 수 있는 유의미한 인구 증가가 감지되지 않았습니다.")

    return result

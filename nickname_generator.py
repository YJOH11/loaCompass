# nickname_generator.py
import mysql.connector
from collections import defaultdict
import random

def fetch_success_nicknames_from_mysql(limit=1000):
    conn = mysql.connector.connect(
        host="localhost",
        user="bit1234",
        password="1234",
        database="loacompass",
        charset="utf8mb4",
        use_unicode=True
    )
    cursor = conn.cursor(dictionary=True)
    query = """
        SELECT character_name
        FROM character_record
        WHERE character_name IS NOT NULL
          AND source IN ('SEARCHED', 'AUTO')
        GROUP BY character_name
        ORDER BY MAX(recorded_at) DESC
        LIMIT %s
    """
    cursor.execute(query, (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [row['character_name'] for row in rows]

def build_ngram_model(nicknames, n=2):
    if not nicknames or len(nicknames) < n:
        print(f"[WARNING] 닉네임 수가 너무 적어서 학습 불가: {len(nicknames)}개")
        return None

    model = defaultdict(int)
    for name in nicknames:
        for i in range(len(name) - n + 1):
            gram = name[i:i+n]
            model[gram] += 1

    print(f"[INFO] n-gram 모델 학습 완료 (닉네임 수: {len(nicknames)} / n-gram 수: {len(model)})")
    return model

def generate_nickname(model, length=3):
    grams = list(model.keys())
    weights = list(model.values())
    result = random.choices(grams, weights=weights, k=length)
    return result[0] + ''.join(g[-1] for g in result[1:])

# === 모델 초기화 및 재학습 ===
ngram_model = None

def refresh_ngram_model():
    global ngram_model
    nicknames = fetch_success_nicknames_from_mysql(limit=1000)
    ngram_model = build_ngram_model(nicknames, n=2)
    print(f"n-gram 모델 학습 완료 (닉네임 수: {len(nicknames)})")

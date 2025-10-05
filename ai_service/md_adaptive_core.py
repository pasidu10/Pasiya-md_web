# File: ai_service/md_adaptive_core.py
"""AdaptiveEngine
Simple adaptive logic for selecting the next topic for a learner.
"""
from typing import List, Dict, Optional
from collections import defaultdict

class AdaptiveEngine:
    def __init__(self, mastery_threshold: float = 70.0):
        self.mastery_threshold = mastery_threshold

    def _aggregate_user_history(self, user_history: List[Dict]) -> Dict[int, Dict]:
        scores = defaultdict(list)
        attempts = defaultdict(int)
        last_seen = {}
        for entry in user_history:
            tid = entry.get("topic_id")
            if tid is None:
                continue
            score = entry.get("score")
            if isinstance(score, (int, float)):
                scores[tid].append(float(score))
            a = entry.get("attempts", 1)
            try:
                attempts[tid] += int(a)
            except Exception:
                attempts[tid] += 1
            if entry.get("last_seen"):
                last_seen[tid] = entry.get("last_seen")
        aggregated = {}
        for tid, sc_list in scores.items():
            avg = sum(sc_list) / len(sc_list) if sc_list else 0.0
            aggregated[tid] = {
                "avg_score": avg,
                "attempts": attempts.get(tid, len(sc_list) or 1),
                "last_seen": last_seen.get(tid),
            }
        for tid, a_count in attempts.items():
            if tid not in aggregated:
                aggregated[tid] = {
                    "avg_score": 0.0,
                    "attempts": a_count,
                    "last_seen": last_seen.get(tid),
                }
        return aggregated

    def get_next_topic(self, user_history: List[Dict], available_topics: List[int]) -> Optional[int]:
        if not available_topics:
            return None
        aggregated = self._aggregate_user_history(user_history)
        candidates = []
        for tid in available_topics:
            if tid not in aggregated:
                candidates.append({
                    "topic_id": tid,
                    "priority": 0,
                    "avg_score": 0.0,
                    "attempts": 0
                })
        for tid in available_topics:
            stats = aggregated.get(tid)
            if stats:
                if stats["avg_score"] < self.mastery_threshold:
                    candidates.append({
                        "topic_id": tid,
                        "priority": 1,
                        "avg_score": stats["avg_score"],
                        "attempts": stats["attempts"]
                    })
        if candidates:
            candidates.sort(key=lambda c: (c["priority"], c["avg_score"], c["attempts"], c["topic_id"]))
            return candidates[0]["topic_id"]
        return sorted(available_topics)[0]

if __name__ == "__main__":
    engine = AdaptiveEngine()
    sample_history = [
        {"topic_id": 1, "score": 85, "attempts": 1},
        {"topic_id": 2, "score": 55, "attempts": 2},
        {"topic_id": 3, "score": 68, "attempts": 1},
        {"topic_id": 4, "score": 92, "attempts": 3},
    ]
    available = [2,3,5,6]
    print("Chosen topic:", engine.get_next_topic(sample_history, available))

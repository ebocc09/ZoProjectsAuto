"""Owner workshop overlay — notes and live field patches on top of the paperwork."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

PATH = Path(__file__).resolve().parent / "workshop.json"


def empty() -> dict:
    return {"updatedAt": None, "vehicle": {}, "systems": {}, "parts": {}, "log": []}


def load() -> dict:
    if not PATH.exists():
        return empty()
    try:
        data = json.loads(PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return empty()
    data.setdefault("vehicle", {})
    data.setdefault("systems", {})
    data.setdefault("parts", {})
    data.setdefault("log", [])
    return data


def save(data: dict) -> dict:
    data["updatedAt"] = datetime.now(timezone.utc).isoformat()
    PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return data


def add_note(body: dict) -> dict:
    text = (body.get("text") or "").strip()
    patch = body.get("patch") or {}
    part = body.get("part") or None
    system = body.get("system") or None
    if not text and not patch:
        raise ValueError("Need a note or a field change.")

    ws = load()
    entry = {
        "id": f"n{len(ws['log']) + 1}",
        "at": datetime.now(timezone.utc).isoformat(),
        "system": system,
        "part": part,
        "text": text,
        "patch": patch,
    }
    ws["log"].append(entry)

    if part:
        slot = ws["parts"].setdefault(part, {})
        if text:
            notes = slot.get("notes") or []
            if isinstance(notes, str):
                notes = [notes]
            notes.append(text)
            slot["notes"] = notes
        for key in ("pn", "name", "status"):
            if patch.get(key):
                slot[key] = patch[key]
        if isinstance(patch.get("spec"), dict) and patch["spec"]:
            slot.setdefault("spec", {}).update(patch["spec"])

    vital = patch.get("vital")
    if isinstance(vital, dict) and vital.get("k") and vital.get("v"):
        ws.setdefault("vehicle", {}).setdefault("vitals", {})[vital["k"]] = vital["v"]

    if system and text:
        sys_slot = ws["systems"].setdefault(system, {})
        notes = sys_slot.get("notes") or []
        if isinstance(notes, str):
            notes = [notes]
        notes.append(text)
        sys_slot["notes"] = notes[-12:]

    return save(ws)


def blurb(system: str | None, part: str | None) -> str:
    ws = load()
    lines: list[str] = []
    vitals = (ws.get("vehicle") or {}).get("vitals") or {}
    if system == "wheels" and vitals.get("Tires"):
        lines.append(
            f"Workshop current tires: {vitals['Tires']}. "
            "The geometry sheets still say P205/75R14 as the as-built size."
        )
    slot = (ws.get("parts") or {}).get(part or "") or {}
    if slot.get("pn"):
        lines.append(f"Workshop PN / size: {slot['pn']}.")
    notes = slot.get("notes") or []
    if isinstance(notes, str):
        notes = [notes]
    if not notes:
        notes = ((ws.get("systems") or {}).get(system or "") or {}).get("notes") or []
        if isinstance(notes, str):
            notes = [notes]
    for note in notes[-4:]:
        lines.append(f"Note: {note}")
    if not lines:
        return ""
    return "\n\nWorkshop log\n" + "\n".join(lines)

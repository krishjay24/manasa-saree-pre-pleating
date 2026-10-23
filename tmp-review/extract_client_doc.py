import re
from pathlib import Path

p = Path(r"c:\Users\User\Downloads\manasa_x5f_saree_x5f_pre_x5f_pleating (1).html")
raw = p.read_text(encoding="utf-8", errors="replace")
print("size", len(raw))
m = re.search(r"<title>(.*?)</title>", raw, re.I | re.S)
print("TITLE:", (m.group(1) if m else None))

keys = (
    "saree",
    "pleat",
    "kovur",
    "price",
    "whatsapp",
    "manasa",
    "booking",
    "bridal",
    "ironing",
    "nellore",
    "instagram",
    "pickup",
    "advance",
    "gpay",
)
strings = re.findall(r'"((?:[^"\\]|\\.){12,500})"', raw)
seen = set()
out = []
for s in strings:
    t = s.encode("utf-8").decode("unicode_escape", errors="replace")
    t = t.replace("\\n", "\n")
    low = t.lower()
    if any(k in low for k in keys):
        if t not in seen:
            seen.add(t)
            out.append(t)

print("matching strings", len(out))
Path("tmp-review/client-doc-strings.txt").write_text("\n\n====\n\n".join(out), encoding="utf-8")
print("wrote", len(out), "strings")

# also dump body text-ish without script
body = re.sub(r"<script[\s\S]*?</script>", " ", raw, flags=re.I)
body = re.sub(r"<style[\s\S]*?</style>", " ", body, flags=re.I)
text = re.sub(r"<[^>]+>", " ", body)
text = re.sub(r"\s+", " ", text)
Path("tmp-review/client-doc-body.txt").write_text(text[:50000], encoding="utf-8")
print("body snippet length", len(text))

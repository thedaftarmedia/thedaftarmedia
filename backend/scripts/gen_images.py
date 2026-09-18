import asyncio
import base64
import io
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from PIL import Image

ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

OUT_DIR = Path('/app/frontend/public/assets/stickers')
OUT_DIR.mkdir(parents=True, exist_ok=True)

from emergentintegrations.llm.chat import LlmChat, UserMessage

KEY = "transparent background"  # placeholder to avoid confusion

STYLE = (
    "die-cut sticker style, bold pop-art desi collage aesthetic, halftone dot shading, "
    "hot pink #FF007A, deep maroon, cream #FAF7F2, black, neon yellow accents, "
    "thick white sticker outline around the subject, grainy texture, playful Indian internet culture vibe, "
    "isolated on a plain solid pure magenta background (exactly #FF00FF), nothing else in frame, no text unless specified"
)

ASSETS = {
    "pigeon": "a cool confident pigeon wearing tiny black sunglasses, head tilted, " + STYLE,
    "phone": "a vintage black rotary landline telephone with curly cord, slightly tilted, " + STYLE,
    "bubble": 'a chunky comic speech bubble sticker with the hand-lettered words "arre yaar" inside it in black, cream colored bubble, ' + STYLE,
    "star": 'a halftone starburst badge sticker with the words "100% ORIGINAL" hand-lettered in black on neon yellow, ' + STYLE,
    "hand": "a vintage black-and-white engraved pointing hand cutout, collage style with pink halftone shadow, " + STYLE,
    "chai": "a cutting chai glass with steam swirls, pop-art style, hot pink and amber, " + STYLE,
}


def chroma_key(path: Path, target=(255, 0, 255), tol=70):
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()
    new = []
    tr, tg, tb = target
    for r, g, b, a in datas:
        if abs(r - tr) < tol and abs(g - tg) < tol and abs(b - tb) < tol:
            new.append((r, g, b, 0))
        else:
            new.append((r, g, b, a))
    img.putdata(new)
    img.save(path)


async def gen_one(name: str, prompt: str, api_key: str):
    chat = LlmChat(api_key=api_key, session_id=f"sticker-{name}", system_message="You generate images.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    msg = UserMessage(text=f"Generate an image: {prompt}")
    text, images = await chat.send_message_multimodal_response(msg)
    if not images:
        print(f"[{name}] NO IMAGE returned. text={text[:120]}")
        return False
    raw = base64.b64decode(images[0]['data'])
    out = OUT_DIR / f"{name}.png"
    with open(out, "wb") as f:
        f.write(raw)
    chroma_key(out)
    print(f"[{name}] saved {out} ({len(raw)//1024} KB)")
    return True


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    only = sys.argv[1:] if len(sys.argv) > 1 else list(ASSETS.keys())
    for name in only:
        try:
            await gen_one(name, ASSETS[name], api_key)
        except Exception as e:
            print(f"[{name}] ERROR: {e}")

asyncio.run(main())

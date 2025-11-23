// Total models processed: 48
// Total sections across all models: 384
// Total API calls logged: 1536

export const models = [
    // --- ORIGINAL 5 (must stay first) ---
    { "name": "Gemini 3 Pro", "provider": "Google", "type": "multimodal" },
    { "name": "Grok 4", "provider": "xAI", "type": "text-reasoning" },
    { "name": "GPT-5", "provider": "OpenAI", "type": "multimodal" },
    { "name": "Qwen3-Max", "provider": "Alibaba", "type": "text" },
    { "name": "Llama 4 Maverick", "provider": "Meta AI", "type": "text" },
  
    // --- KEY PREVIOUS VERSIONS (not all, just meaningful) ---
    { "name": "Gemini 2.5 Pro", "provider": "Google", "type": "multimodal" },
    { "name": "Gemini 1.5 Pro", "provider": "Google", "type": "multimodal" },
    { "name": "Grok 3", "provider": "xAI", "type": "text-reasoning" },
    { "name": "GPT-4.1", "provider": "OpenAI", "type": "multimodal" },
    { "name": "GPT-4o", "provider": "OpenAI", "type": "multimodal" },
    { "name": "Claude 3.7 Sonnet", "provider": "Anthropic", "type": "text-reasoning" },
    { "name": "Claude 3.5 Sonnet", "provider": "Anthropic", "type": "text-reasoning" },
    { "name": "Claude 3 Opus", "provider": "Anthropic", "type": "text-reasoning" },
    { "name": "Claude 2", "provider": "Anthropic", "type": "text" },
    { "name": "GPT-3.5 Turbo", "provider": "OpenAI", "type": "text" },
  
    // --- MODERN CLASSICS & OPEN MODELS ---
    { "name": "Meta-Llama-3-8B", "provider": "Meta AI", "type": "text" },
    { "name": "Meta-Llama-3.1-8B-Instruct", "provider": "Meta AI", "type": "text" },
    { "name": "Llama-2-7B-Chat", "provider": "Meta AI", "type": "text" },
    { "name": "DeepSeek R1", "provider": "DeepSeek-AI", "type": "text-reasoning" },
    { "name": "DeepSeek V3", "provider": "DeepSeek-AI", "type": "text" },
    { "name": "Mixtral-8x7B-Instruct-v0.1", "provider": "Mistral AI", "type": "text" },
    { "name": "Mistral-7B-Instruct-v0.3", "provider": "Mistral AI", "type": "text" },
    { "name": "Falcon-40B", "provider": "TII UAE", "type": "text" },
  
    // --- VISION & MULTIMODAL FOUNDATION MODELS ---
    { "name": "CLIP ViT-Large-Patch14", "provider": "OpenAI", "type": "vision" },
    { "name": "Qwen-QwQ-32B", "provider": "Qwen", "type": "text" },
    { "name": "Gemma 7B", "provider": "Google", "type": "text" },
    { "name": "Gemma 3 27B IT", "provider": "Google", "type": "text" },
    { "name": "Moonshot K2 Instruct", "provider": "MoonshotAI", "type": "text" },
    { "name": "Phi-4", "provider": "Microsoft", "type": "text" },
    { "name": "Phi-3 Mini 128K", "provider": "Microsoft", "type": "text" },
    { "name": "Zephyr-7B-Beta", "provider": "HuggingFaceH4", "type": "text" },
  
    // --- DIFFUSION (IMAGE MODELS) ---
    { "name": "Stable Diffusion XL Base 1.0", "provider": "Stability AI", "type": "vision" },
    { "name": "Stable Diffusion 3 Medium", "provider": "Stability AI", "type": "vision" },
    { "name": "Stable Diffusion 3.5 Large", "provider": "Stability AI", "type": "vision" },
    { "name": "FLUX.1-dev", "provider": "Black Forest Labs", "type": "vision" },
    { "name": "FLUX.1-schnell", "provider": "Black Forest Labs", "type": "vision" },
    { "name": "FLUX.1-Kontext-dev", "provider": "Black Forest Labs", "type": "vision" },
    { "name": "ControlNet v1-1", "provider": "lllyasviel", "type": "vision" },
    
    // --- VIDEO GENERATION ---
    { "name": "HunyuanVideo", "provider": "Tencent", "type": "text-to-video" },
    { "name": "LTX-Video", "provider": "Lightricks", "type": "text-to-video" },
    { "name": "SDXL-Lightning", "provider": "ByteDance", "type": "vision" },
  
    // --- SPEECH / AUDIO ---
    { "name": "Whisper Large V3", "provider": "OpenAI", "type": "speech-to-text" },
    { "name": "Whisper Large V3 Turbo", "provider": "OpenAI", "type": "speech-to-text" },
    { "name": "ChatTTS", "provider": "2Noise", "type": "text-to-speech" },
  
    // --- OCR & IMAGE TOOLS ---
    { "name": "DeepSeek-OCR", "provider": "DeepSeek-AI", "type": "vision" },
    { "name": "GOT-OCR 2.0", "provider": "Stepfun AI", "type": "vision" },
    { "name": "RMBG-1.4", "provider": "BRIA AI", "type": "vision" },
    { "name": "SmolDocling-256M", "provider": "Docling Project", "type": "vision" }
  ];
  
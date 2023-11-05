import torch
from torch.quantization import quantize_dynamic


model.eval()

# Apply dynamic quantization
model_quantized = quantize_dynamic(
    model,  
    {torch.nn.Linear},  
    dtype=torch.qint8  
)

# Save the quantized model
torch.save(model_quantized.state_dict(), '/path/to/save/llama_2_7b_chat_quantized.pth')

import json
import ast

def correct_list_fields(data):
    # Campos que precisam ser corrigidos
    list_fields = ['genres', 'characters', 'ratingsByStars', 'setting', 'awards']
    
    for book in data:
        for field in list_fields:
            if field in book and isinstance(book[field], str):
                try:
                    # Converte a string de volta para uma lista real
                    book[field] = ast.literal_eval(book[field])
                except (ValueError, SyntaxError):
                    # Caso a conversão falhe, imprime um aviso
                    print(f"Erro ao converter o campo {field} do livro {book['title']}")
    
    return data

# Tenta ler o conteúdo do ficheiro dataset.json
try:
    with open('datasetInicial.json', 'r', encoding='utf-8') as file:
        data = json.load(file)
except json.JSONDecodeError as e:
    print(f"Erro ao decodificar JSON: {e}")
    print(f"Erro na linha {e.lineno}, coluna {e.colno}")
    print(f"Mensagem de erro: {e.msg}")
    # Pode adicionar mais lógica aqui para lidar com o erro, como abrir o arquivo e inspecionar manualmente a linha problemática
    raise

# Corrige os campos que são listas dentro de aspas
corrected_data = correct_list_fields(data)

# Salva o resultado corrigido de volta no ficheiro dataset_corrected.json
with open('dataset_corrected.json', 'w', encoding='utf-8') as file:
    json.dump(corrected_data, file, ensure_ascii=False, indent=4)

print("Campos corrigidos e dados salvos em 'dataset_corrected.json'.")

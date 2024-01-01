import hashlib

def generate_md5_hash(data):
    md5_hash = hashlib.md5()
    md5_hash.update(data.encode('utf-8'))
    hash_result = md5_hash.hexdigest()
    
    return hash_result

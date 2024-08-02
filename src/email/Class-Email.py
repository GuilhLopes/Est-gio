import oracledb

un = 'SENTINELA'
pw = 'Guibaby34'
cs = 'localhost:1521/XEPDB1'

with oracledb.connect(user=un, password=pw, dsn=cs) as connection:
    with connection.cursor() as cursor:
        sql = """select * from hsspess"""
        for r in cursor.execute(sql):
            print(r)
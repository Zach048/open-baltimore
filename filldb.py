#!/usr/bin/python3
import psycopg2
from config import config
import urllib.request, json 


def connect():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)
		
        # create a cursor
        addRestaurants(conn)

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

def getRestuarants():
    with urllib.request.urlopen("https://data.baltimorecity.gov/resource/k5ry-ef3g.json") as url:
        data = json.loads(url.read().decode())
        print(data[name])

def addRestaurants(conn):
    sql = "INSERT INTO restaurants (name, zipCode, neighborhood, address) VALUES(%s, %s, %s, %s)"
    cur = conn.cursor()
    cur.executemany(sql,)
    # close the communication with the PostgreSQL
    cur.close()

if __name__ == '__main__':
    getRestuarants()
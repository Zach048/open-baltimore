#!/usr/bin/python3
import psycopg2
from config import config
import urllib.request, json 
import ast


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
        addRestaurants(conn, getRestuarants())

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed.')

def getRestuarants():
    restaurants = []
    with urllib.request.urlopen("https://data.baltimorecity.gov/resource/k5ry-ef3g.json") as url:
        data = json.loads(url.read().decode())
        for r in data:
            addressMap = ast.literal_eval(r['location_1']['human_address'])
            address = " ".join([addressMap['address'], addressMap['city']+',', addressMap['state']])
            restaurants.append((address, r['name'], r['neighborhood'], r['zipcode']))
    return restaurants

def addRestaurants(conn, restaurants):
    sql = "INSERT INTO restaurant (address, name, neighborhood, zip_code) VALUES(%s, %s, %s, %s)"
    cur = conn.cursor()
    cur.executemany(sql, restaurants)
    # commit the changes to the database
    conn.commit()
    # close the communication with the PostgreSQL
    cur.close()

if __name__ == '__main__':
    connect()
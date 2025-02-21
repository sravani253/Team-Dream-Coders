import sqlite3

# Connect to the database
conn = sqlite3.connect('ats/instance/job.db')

cursor = conn.cursor()

# List all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in the database:")
for table in tables:
    print(table[0])

# View data from the user table
print("\nData from the user table:")
cursor.execute("SELECT * FROM user;")
users = cursor.fetchall()
for user in users:
    print(user)

# View data from the referral table
print("\nData from the referral table:")
cursor.execute("SELECT * FROM referral;")
referrals = cursor.fetchall()
for referral in referrals:
    print(referral)

# Close the connection
conn.close()

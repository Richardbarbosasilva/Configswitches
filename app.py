from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Defining the main route on the "/"

@app.route("/", methods=["GET"])
def index():
    return render_template("dm4370scriptgenerator.html")



# Defining more routes to renderize multiples templates 
# the onclick js function to trigger a template must have the URL: http://127.0.0.1:5000/eddmetroscript
# WHERE /eddmetroscript is the first argument on @app.route

@app.route("/eddmetroscript", methods=["GET"])
def edd_metroscript():
    return render_template("dm4370EDDmetroscript.html")


@app.route("/store-data", methods=["POST"])
def store_data():
    data = request.get_json()

    user_data = {}  # Initialize an empty dictionary to store individual variables

    circuito_value = data.get("circuito")
    cliente_value = data.get("cliente")
    produto_value = data.get("produto")
    radio_valueVLAN = data.get("radioValueVLAN")
    radio_valueCPE = data.get("radioValueCPE")
    VLAN_value = data.get("VLAN")
    METRO_value = data.get("METRO")
    CPE_value = data.get("CPE")
    METROspeed_value = data.get("METROSPEED")
    CPEspeed_value = data.get("CPESPEED")

    # Assign values to individual variables in the dictionary
    user_data["Hostname Circuito"] = circuito_value
    user_data["Hostname Cliente"] = cliente_value
    user_data["produto (Serviços)"] = produto_value
    user_data["METROPossuiVLAN?"] = radio_valueVLAN
    user_data["CPEPossuiVLAN?"] = radio_valueCPE
    user_data["Porta VLAN"] = VLAN_value
    user_data["Porta METRO"] = METRO_value
    user_data["Porta CPE"] = CPE_value
    user_data["METRO Velocidade"] = METROspeed_value
    user_data["CPE Velocidade"] = CPEspeed_value

    # Check for missing user input (optional)
    if not all(user_data.values()):
        return jsonify({"message": "Some inputs are missing!"}), 400

    # Process and store the user data (e.g., print to console)
    print("Collected user data:")
    for key, value in user_data.items():
       print(f"{key}: {value}")

    return jsonify({"message": "Dados processados!"}), 200

# ... other routes

if __name__ == "__main__":
    app.run(debug=True)

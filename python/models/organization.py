from datetime import datetime

class Organization:
    def __init__(self, id: int, name: str, type: str, date_established: int, years_active: int, events: list[str],  username: str | None = None):
        self.__id = id
        self.__name = name
        self.__type = type
        self.__events = events
        self.__date_established = date_established
        self.__years_active = years_active
        self.__username = username
    
    # Getters
    def get_id(self):
        return self.__id
    def get_name(self):
        return self.__name
    def get_type(self):
        return self.__type
    def get_events(self):
        return self.__events
    def get_date_established(self):
        return self.__date_established
    def get_years_active(self):
        return self.__years_active
    def get_username(self):
        return self.__username
    
    # Setters
    def set_name(self, name):
        self.__name = name
    def set_type(self, type):
        self.__type = type
    def set_events(self, events):
        self.__events = events
    def set_date_established(self, date_established):
        self.__date_established = date_established
        self.__years_active = datetime.now().year - date_established
    
